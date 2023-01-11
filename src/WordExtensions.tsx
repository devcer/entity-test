import { DecorationSet } from "@remirror/pm/view";
import { extension, isElementDomNode, MarkExtension } from "remirror";

export function getDisjoinedReferencesFromNode(
  node: any,
  pos: any,
  markTypeName: any
) {
  const isEntityReference = (mark: any) => mark.type.name === markTypeName;
  return node.marks.filter(isEntityReference).map((mark: any) => ({
    from: pos,
    to: pos + Math.max(node.textContent.length, 1),
    ...mark.attrs,
    mark,
    text: node.textContent
  }));
}

@extension({
  defaultOptions: {
    disableExtraAttributes: true
  }
})
class WordExtension extends MarkExtension {
  currentActiveTime = null;

  // eslint-disable-next-line class-methods-use-this
  get name() {
    return "meta-val";
  }

  createMarkSpec = (extra: any, override: any) => {
    const idAttr = `meta-val`;
    return {
      ...override,
      excludes: "",
      attrs: {
        ...extra.defaults(),
        meta: { default: "" }
      },
      toDOM: (mark: any) => {
        return [
          "span",
          {
            ...extra.dom(mark),
            "data-meta": mark.attrs.meta,
            class: "span-mark"
          },
          0
        ];
      },
      parseDOM: [
        {
          tag: `span[${idAttr}]`,
          getAttrs: (node: any) => {
            if (!isElementDomNode(node)) {
              return false;
            }
            const meta = node.getAttribute("data-meta");
            return { ...extra.parse(node), meta };
          }
        },
        ...(override.parseDOM ?? [])
      ]
    };
  };
}

export { WordExtension }