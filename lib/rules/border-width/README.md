# border-width

Specify a scale for border-width.

```css
a {
  border-width: 0.1rem;
}
/**               ↑
 *                This size */
```

This rule checks [font-relative](https://drafts.csswg.org/css-values-4/#font-relative-lengths) and [absolute](https://drafts.csswg.org/css-values-4/#absolute-lengths) lengths.

## Options

`array`

Given:

```json
[0.1, 0.2]
```

The following patterns are considered violations:

```css
a {
  border-width: 0.5rem;
}
```

The following patterns are _not_ considered violations:

```css
a {
  border-width: 0.1rem;
}
```