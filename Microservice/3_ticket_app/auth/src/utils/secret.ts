import { KubeConfig, CoreV1Api } from "@kubernetes/client-node";

export class Secret {
	private static kubeConfig: KubeConfig = new KubeConfig();
	private static k8sApi: CoreV1Api;

	static {
		this.kubeConfig.loadFromDefault();
		this.k8sApi = this.kubeConfig.makeApiClient(CoreV1Api);
	}

	static async getSecret(
		secretKey: string,
		secretName: string = "secret",
		namespace: string = "default"
	): Promise<string> {
		try {
			const res = await this.k8sApi.readNamespacedSecret(secretName, namespace);
			const secretData = res.body.data?.[secretKey];
			if (!secretData) {
				throw new Error(
					`Secret key '${secretKey}' not found in '${secretName}'`
				);
			}
			const decodedSecret = Buffer.from(secretData, "base64").toString("utf-8");
			return decodedSecret;
		} catch (error) {
			console.error(
				`Error fetching secret '${secretName}' in namespace '${namespace}':`,
				error
			);
			throw error;
		}
	}
}
