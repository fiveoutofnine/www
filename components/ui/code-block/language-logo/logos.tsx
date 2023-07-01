import type { FC } from 'react';

export const JavaScriptLogo: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>JavaScript</title>
      <desc>JavaScript&apos;s logo.</desc>
      <path
        d="M4 2Q2 2 2 4v16q0 2 2 2h16q2 0 2-2V4q0-2-2-2H0zm9 14.9c0 1.7-.88 3.1-2.84 3.1-1.34 0-2.24-.52-2.86-1.6l1.36-1c.32.6.78.88 1.24.88.72 0 1.1-.36 1.1-1.54V11h2v5.9zm4.16 3.1c-1.16 0-2.38-.44-3.28-1.28l1.14-1.36c.64.54 1.46.92 2.2.92.84 0 1.24-.32 1.24-.86 0-.56-.5-.74-1.28-1.06L16 15.88c-.92-.36-1.78-1.12-1.78-2.42 0-1.46 1.3-2.62 3.16-2.62 1.02 0 2.1.4 2.86 1.16l-1.02 1.26c-.58-.44-1.12-.7-1.84-.7-.7 0-1.12.3-1.12.8 0 .54.58.74 1.34 1.04l1.14.46c1.08.44 1.76 1.16 1.76 2.4 0 1.46-1.22 2.74-3.34 2.74z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PythonLogo: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>Python</title>
      <desc>Python&apos;s logo.</desc>
      <svg viewBox="0 0 24 24">
        <g fill="currentColor">
          <path d="M11.871 1.052c-.893.005-1.745.08-2.496.213-2.21.391-2.612 1.208-2.612 2.716v1.99h5.224v.664H4.803c-1.518 0-2.847.913-3.263 2.65-.48 1.989-.501 3.23 0 5.308.37 1.546 1.258 2.648 2.776 2.648h1.796v-2.386c0-1.725 1.492-3.245 3.263-3.245h5.218c1.452 0 2.612-1.196 2.612-2.655V3.981c0-1.416-1.195-2.479-2.612-2.715a16.317 16.317 0 0 0-2.723-.214zM9.046 2.654c.54 0 .98.447.98.998 0 .549-.44.992-.98.992a.986.986 0 0 1-.98-.992.99.99 0 0 1 .98-.998z" />
          <path d="M17.856 6.635v2.32c0 1.798-1.525 3.312-3.263 3.312H9.375c-1.43 0-2.612 1.223-2.612 2.654v4.975c0 1.415 1.231 2.248 2.612 2.654 1.653.486 3.24.574 5.218 0 1.315-.381 2.611-1.147 2.611-2.654v-1.991h-5.217v-.664h7.83c1.517 0 2.084-1.059 2.612-2.648.545-1.637.521-3.21 0-5.31-.376-1.51-1.092-2.648-2.613-2.648h-1.96zM14.92 19.232c.542 0 .98.444.98.993a.99.99 0 0 1-.98.998.991.991 0 0 1-.98-.998c0-.55.44-.993.98-.993z" />
        </g>
      </svg>
    </svg>
  );
};

export const ReactLogo: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>React</title>
      <desc>React&apos;s logo.</desc>
      <svg viewBox="0 0 24 24">
        <g transform="translate(1 1.768) scale(.95652)">
          <circle cx="11.5" cy="10.232" r="2.05" fill="currentColor" />
          <g stroke="currentColor" fill="none" transform="translate(11.5 10.232)">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </g>
      </svg>
    </svg>
  );
};

export const SolidityLogo: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>Solidity</title>
      <desc>Solidity&apos;s logo.</desc>
      <path d="M14.517 1 10.98 7.286H3.912L7.446 1h7.07" fill="currentColor" />
      <path d="M10.98 7.286h7.07L14.518 1H7.446l3.534 6.286z" fill="currentColor" />
      <path
        d="m7.446 13.57 3.534-6.284L7.446 1 3.912 7.286l3.534 6.283zM7.481 23l3.537-6.286h7.07L14.553 23h-7.07"
        fill="currentColor"
      />
      <path
        d="M11.018 16.714h-7.07L7.48 23h7.071l-3.534-6.286zm3.534-6.284-3.534 6.284L14.552 23l3.537-6.286-3.537-6.284z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TypeScriptLogo: FC<JSX.IntrinsicElements['svg']> = ({ className, ...rest }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>TypeScript</title>
      <desc>TypeScript&apos;s logo.</desc>
      <mask id="a">
        <path fill="#fff" d="M2 2h20v20H2z" />
        <path
          d="M14.38 17.914v1.955c.318.163.693.286 1.127.367s.892.122 1.373.122a6.46 6.46 0 0 0 1.336-.134c.421-.09.791-.238 1.11-.443.317-.206.569-.475.754-.807s.278-.742.278-1.231c0-.355-.053-.665-.159-.932s-.259-.504-.458-.712c-.2-.208-.44-.394-.718-.559s-.594-.32-.945-.467a11.895 11.895 0 0 1-.69-.309 3.508 3.508 0 0 1-.52-.306 1.332 1.332 0 0 1-.33-.33.694.694 0 0 1-.117-.394c0-.134.035-.255.104-.363s.167-.2.294-.278a1.57 1.57 0 0 1 .464-.18c.184-.043.387-.065.612-.065a4.088 4.088 0 0 1 1.064.15 3.809 3.809 0 0 1 .534.193c.173.077.333.167.48.268v-1.827c-.297-.114-.622-.198-.975-.253s-.757-.083-1.213-.083c-.465 0-.905.05-1.32.15s-.782.256-1.098.467a2.336 2.336 0 0 0-.749.81c-.183.328-.275.72-.275 1.176 0 .583.168 1.08.504 1.491.336.412.847.76 1.532 1.045.269.11.52.218.752.324s.433.216.602.33c.169.114.302.238.4.373a.76.76 0 0 1 .055.81c-.061.107-.154.201-.278.28s-.28.142-.465.187a2.792 2.792 0 0 1-.65.067 3.758 3.758 0 0 1-2.415-.892zm-3.288-4.818h2.509v-1.604H6.609v1.604h2.496v7.145h1.987z"
          fill="#000"
        />
      </mask>
      <rect mask="url(#a)" fill="currentColor" x="2" y="2" height="20" width="20" rx="2" />
    </svg>
  );
};
