/**
 * Minimal structural type of a Font Awesome icon definition, as exported by
 * `@fortawesome/free-solid-svg-icons` / `@fortawesome/free-brands-svg-icons`
 * (`faHeart`, `faGithub`, ...): `icon` is `[width, height, aliases, unicode, svgPathData]`.
 */
export interface FaIconDefinition {
  iconName: string
  icon: readonly [number, number, unknown, unknown, string | readonly string[]]
}
