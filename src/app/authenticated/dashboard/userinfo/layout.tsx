import React from 'react';

interface Props {
    children: React.ReactNode
}

export default function layout(props: Props) {
  return (
    <div>
        {props.children}
    </div>
  );
}

