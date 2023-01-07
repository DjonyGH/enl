import React from 'react';
import { render } from '@testing-library/react';

import Login from '../Login';

const testId = 'testingLogin';

type LoginProps = React.ComponentProps<typeof Login>;

const renderComponent = (props: LoginProps = {
  from: undefined,
}) => render(
  <Login
    data-testid={testId}
    {...props}
  />,
);

describe('Компонент Login', () => {
  it('отображается без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });
});
