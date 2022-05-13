import authenticated from '~/policies/authenticated.server';

import { json } from '@remix-run/node';
import {
  Form,
  useActionData,
} from '@remix-run/react';

export const action = async ({ request }) => {
  return await authenticated(
    request,
    () => {
      return json({
        result: "done"
      });
    },
    () => {
      throw new Response("Unauthorized", { status: 401 });
    }
  )
};

export default function Settings() {
  const actionData = useActionData();

  return (
    <>
      <p style={{color: "green"}}>{actionData?.result}</p>
      <Form method="post">
        <label htmlFor="name">
          Name:
          <input type="text" name="name" id="name" />
        </label>
        <button type="submit">Update</button>
      </Form>
    </>
  )
}
