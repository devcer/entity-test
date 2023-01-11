import React, { ComponentType } from "react";
import { ExtensionTag, NodeExtension, NodeExtensionSpec } from "@remirror/core";
import { NodeViewComponentProps } from "@remirror/react";
import { extension } from "remirror";

@extension({
  defaultOptions: {
    disableExtraAttributes: true
  }
})
class UserCardExtension extends NodeExtension {
  get name() {
    return "custom-para";
  }

  ReactComponent: ComponentType<NodeViewComponentProps> = ({
    node,
    forwardRef
  }) => {
    const { s } = node.attrs;

    return (
      <div
        style={{
          display: "block"
        }}
      >
        <div
          contentEditable="false"
          style={{
            userSelect: "none"
          }}
        >
          <span>
            <b>{s}</b>
          </span>
        </div>
        <span className="wrapper-span" ref={forwardRef} />
      </div>
    );
  };

  createTags() {
    return [ExtensionTag.Block];
  }

  createNodeSpec(extra: any, override: any): NodeExtensionSpec {
    return {
      attrs: {
        s: { default: "" }
      },
      content: "inline*",
      parseDOM: [
        {
          tag: "span",
          getAttrs: (node) => ({
            ...extra.parse(node)
          })
        },
        ...(override.parseDOM ?? [])
      ],

      toDOM: (node) => {
        return ["span", { ...extra.dom(node), class: "para-mark" }, 0];
      }
    };
  }
}

export { UserCardExtension }