declare module '*.css' {
  interface ClassNames {
    [className: string]: string;
  }
  const classNames: ClassNames;
  export = classNames;
}

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
