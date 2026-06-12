import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import plugin from "eslint-plugin-react-hooks";

export default function RTE(name, control, label) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller>
        name:{name}
        control:{control}
        render:
        {({ field: { onchange } }) => (
          <Editor>
            initialValue={defaultValue}
            init =
            {{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar: [
                { name: "history", items: ["undo", "redo"] },
                { name: "styles", items: ["styles"] },
                { name: "formatting", items: ["bold", "italic"] },
                {
                  name: "alignment",
                  items: [
                    "alignleft",
                    "aligncenter",
                    "alignright",
                    "alignjustify",
                  ],
                },
                { name: "indentation", items: ["outdent", "indent"] },
              ],
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          </Editor>
        )}
      </Controller>
    </div>
  );
}
