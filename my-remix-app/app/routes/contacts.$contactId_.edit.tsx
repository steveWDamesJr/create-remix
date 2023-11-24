import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { 
    Form,
    useLoaderData,
    useNavigate,
 } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getContact } from "../data";

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param");
    const contact =await getContact(params.contactId);
    if ( !contact) {
        throw new Response("Not found", { status: 404 });
    }
    return json({ contact });
}

export default function EditContact() {
    const { contact } = useLoaderData<typeof loader>();
    const navigate = useNavigate();

    return(
        <Form id="contact-form" method="post">
            <p>
                <span>Name</span>
                <input
                    defaultValue={contact.first}
                    aria-label="First name"
                    name="first"
                    type="text"
                    placeholder="First"
                />
                <input
                    defaultValue={contact.last}
                    aria-label="Last name"
                    name="last"
                    type="text"
                    placeholder="Last"
                />
            </p>
            <label>
                <span>Twitter</span>
                <input
                    defaultValue={contact.twitter}
                    name="twitter"
                    type="text"
                    placeholder="@jack"
                >
                </input>
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    aria-label="Avatar URL"
                    defaultValue={contact.avatar}
                    name="avatar"
                    type="text"
                    placeholder="https://example.com/avatar.jpg"
                >
                </input>
            </label>
            <label>
                <span>Notes</span>
                <textarea
                    defaultValue={contact.notes}
                    name="notes"
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button onClick={() => navigate(-1)} type="button">
                    Cancel
                </button>
            </p>
        </Form>
    );
}
