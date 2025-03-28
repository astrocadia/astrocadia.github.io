import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { Section } from "../components/Section";
import oktaLogin from "../assets/okta-login.png";

export const Professional: FunctionComponent = () => {
  const { section } = useParams();

  let title = "";
  let content = null;

  switch (section) {
    case "okta":
      title = "Multi-Tenant Okta SSO Integration";
      content = (
        <div className="mx-auto flex max-w-3xl flex-col rounded-lg border-1 border-gray-300 bg-white p-6 text-left shadow-lg">
          <p className="mb-4 text-left text-gray-700">
            I implemented a full stack, secure, multi-tenant authentication
            system using <span className="font-semibold">Okta SSO </span>
            for seamless user login across multiple organizations for our custom
            app at{" "}
            <a
              href="https://app.gumband.com"
              className="text-blue-900 hover:text-blue-600"
            >
              app.gumband.com
            </a>
            . This integration leverages{" "}
            <span className="font-semibold">Passport.js</span>
            and <span className="font-semibold">OpenID Connect</span> to
            authenticate users and manage session persistence with Redis. I also
            built the front-end panel for user interaction with this feature:
          </p>
          <div className="center-items flex justify-center">
            <img
              src={oktaLogin}
              alt="login with okta panel"
              className="h-1/2 w-1/2"
            />
          </div>

          <h2 className="mt-4 mb-2 text-xl font-semibold text-gray-800">
            Key Features:
          </h2>
          <ul className="list-inside list-disc space-y-2 text-left text-gray-700">
            <li>Supports multiple Okta organizations dynamically.</li>
            <li>
              Uses <span className="font-semibold">Redis</span> for session
              storage to enhance performance and scalability.
            </li>
            <li>
              Implements <span className="font-semibold">JWT</span>-based
              authentication for secure API access.
            </li>
            <li>
              Ensures seamless user role management, including automatic admin
              assignments.
            </li>
            <li>
              Deletes obsolete password reset requests for Okta-authenticated
              users.
            </li>
          </ul>

          <h2 className="mt-4 mb-2 text-xl font-semibold text-gray-800">
            Tech Stack:
          </h2>
          <div className="center-items flex flex-wrap gap-2">
            <span className="rounded-md bg-blue-200 px-3 py-1 text-sm font-medium text-gray-800">
              Node.js
            </span>
            <span className="rounded-md bg-blue-200 px-3 py-1 text-sm font-medium text-gray-800">
              Express
            </span>
            <span className="rounded-md bg-blue-200 px-3 py-1 text-sm font-medium text-gray-800">
              Passport.js
            </span>
            <span className="rounded-md bg-blue-200 px-3 py-1 text-sm font-medium text-gray-800">
              Okta
            </span>
            <span className="rounded-md bg-blue-200 px-3 py-1 text-sm font-medium text-gray-800">
              Redis
            </span>
            <span className="rounded-md bg-blue-200 px-3 py-1 text-sm font-medium text-gray-800">
              JWT
            </span>
            <span className="rounded-md bg-blue-200 px-3 py-1 text-sm font-medium text-gray-800">
              TypeScript
            </span>
          </div>

          <h2 className="mt-4 mb-2 text-xl font-semibold text-gray-800">
            How It Works:
          </h2>
          <p className="mb-2 text-gray-700">
            Users authenticate via Okta, which retrieves their profile and
            assigns appropriate roles. The system dynamically loads Okta
            configurations for multiple organizations, ensuring that users are
            routed to the correct authentication flow. Once authenticated, users
            receive a JWT token for secure session management.
          </p>

          <h2 className="mt-4 mb-2 text-xl font-semibold text-gray-800">
            Challenges & Solutions:
          </h2>
          <ul className="list-inside list-disc space-y-2 text-left text-gray-700">
            <li>
              <span className="font-semibold">Dynamic Org Handling:</span>{" "}
              Implemented a strategy to fetch Okta metadata dynamically for
              different organizations.
            </li>
            <li>
              <span className="font-semibold">Session Performance:</span> Used{" "}
              <span className="font-semibold">Redis</span> to efficiently manage
              user sessions.
            </li>
            <li>
              <span className="font-semibold">Security:</span> Ensured proper
              JWT handling and restricted admin access to designated users.
            </li>
          </ul>

          <h2 className="mt-4 mb-2 text-xl font-semibold text-gray-800">
            Outcome:
          </h2>
          <p className="mb-4 text-gray-700">
            The integration provides a seamless SSO experience for users across
            multiple organizations while maintaining high security and
            performance. By using Okta, Passport.js, and Redis, I built a
            scalable authentication system that streamlines user management and
            access control.
          </p>
        </div>
      );
      break;
  }
  return <Section title={title}>{content}</Section>;
};
