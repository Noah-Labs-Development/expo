/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Link } from '../Link';

it('renders a Link', () => {
  const { getByTestId } = render(
    <Link testID="link" href="/foo">
      Foo
    </Link>
  );
  const node = getByTestId('link');
  expect(node).toMatchInlineSnapshot(`
    <a
      class="css-text-146c3p1 r-cursor-1loqt21"
      data-testid="link"
      dir="auto"
      href="/foo"
      role="link"
    >
      Foo
    </a>
  `);
  expect(node.getAttribute('href')).toBe('/foo');
});

it('renders a Link with a slot', () => {
  const { asFragment } = render(
    <Link asChild href="/foo">
      <View testID="pressable">
        <Text testID="inner-text">Button</Text>
      </View>
    </Link>
  );
  expect(asFragment().getRootNode()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <a
        class="css-view-g5y9jx"
        data-testid="pressable"
        href="/foo"
        role="link"
      >
        <div
          class="css-text-146c3p1"
          data-testid="inner-text"
          dir="auto"
        >
          Button
        </div>
      </a>
    </DocumentFragment>
  `);
});

it('supports target blank', () => {
  const { getByTestId } = render(
    <Link href="/foo" testID="link" style={{ color: 'red' }} className="xxx">
      Hello
    </Link>
  );
  const node = getByTestId('link');
  expect(node.className).toMatch(/\sxxx\s/);
  expect(node).toMatchInlineSnapshot(`
    <a
      class="css-text-146c3p1 xxx r-cursor-1loqt21"
      data-testid="link"
      dir="auto"
      href="/foo"
      role="link"
      style="color: rgb(255, 0, 0);"
    >
      Hello
    </a>
  `);
});

it('mixes styles with className', () => {
  const { getByTestId } = render(
    <Link href="/foo" testID="link" style={{ color: 'red' }} className="xxx">
      Hello
    </Link>
  );
  const node = getByTestId('link');
  expect(node.className).toMatch(/\sxxx\s/);
  expect(node).toMatchInlineSnapshot(`
    <a
      class="css-text-146c3p1 xxx r-cursor-1loqt21"
      data-testid="link"
      dir="auto"
      href="/foo"
      role="link"
      style="color: rgb(255, 0, 0);"
    >
      Hello
    </a>
  `);
});

it('mixes registered styles with className', () => {
  const style = StyleSheet.create({
    foo: {
      color: 'red',
    },
  }).foo;
  const { getByTestId } = render(
    <Link href="/foo" testID="link" style={style} className="xxx">
      Hello
    </Link>
  );
  const node = getByTestId('link');
  expect(node.className).toMatch(/\sxxx\s/);
  expect(node).toMatchInlineSnapshot(`
    <a
      class="css-text-146c3p1 r-color-howw7u xxx r-cursor-1loqt21"
      data-testid="link"
      dir="auto"
      href="/foo"
      role="link"
    >
      Hello
    </a>
  `);
});

it('uses web-only href attributes', () => {
  const { getByTestId } = render(
    <Link href="/foo" testID="link" download="file.png" rel="noopener" target="_blank">
      Hello
    </Link>
  );
  const node = getByTestId('link');
  expect(node).toMatchInlineSnapshot(`
    <a
      class="css-text-146c3p1 r-cursor-1loqt21"
      data-testid="link"
      dir="auto"
      download="file.png"
      href="/foo"
      rel="noopener"
      role="link"
      target="_blank"
    >
      Hello
    </a>
  `);
});

describe('base url relative links', () => {
  let old_base_url: string | undefined = undefined;

  beforeAll(() => {
    old_base_url = process.env.EXPO_BASE_URL;
    process.env.EXPO_BASE_URL = '/base_url';
  });

  afterAll(() => {
    process.env.EXPO_BASE_URL = old_base_url;
  });

  it('appends base url to paths uris', () => {
    const { getByTestId } = render(
      <Link testID="link" href="/foo">
        Foo
      </Link>
    );
    const node = getByTestId('link');
    expect(node.getAttribute('href')).toBe('/base_url/foo');
  });

  it('does not append base url to absolute network', () => {
    const { getByTestId } = render(
      <Link testID="link" href="//www.example.com/foo">
        Foo
      </Link>
    );
    const node = getByTestId('link');
    expect(node.getAttribute('href')).toBe('//www.example.com/foo');
  });

  it('does not append base url to absolute uris', () => {
    const { getByTestId } = render(
      <Link testID="link" href="https://www.example.com/foo">
        Foo
      </Link>
    );
    const node = getByTestId('link');
    expect(node.getAttribute('href')).toBe('https://www.example.com/foo');
  });
});

describe('Link with preview', () => {
  it('renders a Link with preview as normal link', () => {
    const { getByTestId } = render(
      <Link href="/foo" testID="link">
        <Link.Trigger>
          <Text>Foo</Text>
        </Link.Trigger>
        <Link.Preview />
        <Link.Menu>
          <Link.MenuAction title="Bar" onPress={() => {}}>
            Bar
          </Link.MenuAction>
        </Link.Menu>
      </Link>
    );

    expect(getByTestId('link')).toMatchSnapshot();
  });
  it('correctly renders link with Preview and asChild', () => {
    const { getByTestId } = render(
      <View testID="link-wrapper">
        <Link href="/foo" asChild>
          <Link.Trigger>
            <Text testID="inner-text">Foo</Text>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Bar" onPress={() => {}}>
              Bar
            </Link.MenuAction>
          </Link.Menu>
        </Link>
      </View>
    );
    const linkWrapper = getByTestId('link-wrapper');
    expect(linkWrapper).toMatchSnapshot();
  });
});
