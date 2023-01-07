import { render, screen } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';

import NotFoundRoute from '../NotFound';

const renderComponent = () => render(<NotFoundRoute />);

describe('Компонент NotFound', () => {
/*
  it('snapshot совпадает', () => {
    const tree = renderer.create(<NotFoundRoute />).toJSON();
    expect(tree).toMatchSnapshot();
  });
*/
  it('компонент отображается без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  it('содержит нужный текст', () => {
    renderComponent();

    expect(screen.getByText(/Страница не найдена/i)).toBeInTheDocument();
  });
});
