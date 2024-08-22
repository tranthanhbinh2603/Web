/* eslint-disable react-refresh/only-export-components */
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();
  const isChanging = fetcher.state === "submitting";
  return (
    <fetcher.Form method="PATCH" className="text-right">
      {isChanging ? (
        <Button type="primary" disabled={true}>
          Waiting...
        </Button>
      ) : (
        <Button type="primary">Make priority</Button>
      )}
    </fetcher.Form>
  );
}

export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrder;
