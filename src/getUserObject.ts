export const getUserObject = () => {
  const userAttrs = Array.from(Array(5).keys()).map((id) => ({
    id,
    name: "John Doe",
    message:
      "This is editable content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus et molestie ac feugiat sed lectus. Sit amet risus nullam eget. Ullamcorper a lacus vestibulum sed arcu non odio. Amet cursus sit amet dictum sit amet justo donec enim. At quis risus sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam. Morbi tempus iaculis urna id volutpat lacus laoreet. Porttitor rhoncus dolor purus non enim praesent elementum. Quis ipsum suspendis"
  }));

  const userCardContentObj: any = userAttrs.reduce(
    (accum: any, current: any) => {
      const eachWord = current.message.split(" ");
      accum = [
        ...accum,
        {
          type: 'paragraph',
          content: [
            {
              type: "custom-para",
              attrs: {
                s: current.name
              },
              content: eachWord.map((word: any, index: number) => ({
                type: "text",
                marks: [
                  {
                    type: "meta-val",
                    attrs: {
                      meta: `example-${index + 1}`
                    }
                  }
                ],
                text: ` ${word}`
              }))
            }
          ]
        }
      ];
      return accum;
    },
    []
  );

  return userCardContentObj;
};


// export const getUserObject = () => {
//   const userAttrs = Array.from(Array(5).keys()).map((id) => ({
//     id,
//     name: "John Doe",
//     message:
//       "This is editable content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus et molestie ac feugiat sed lectus. Sit amet risus nullam eget. Ullamcorper a lacus vestibulum sed arcu non odio. Amet cursus sit amet dictum sit amet justo donec enim. At quis risus sed vulputate. Auctor neque vitae tempus quam pellentesque nec nam aliquam. Morbi tempus iaculis urna id volutpat lacus laoreet. Porttitor rhoncus dolor purus non enim praesent elementum. Quis ipsum suspendis"
//   }));

//   const userCardContentObj: any = userAttrs.reduce(
//     (accum: any, current: any) => {
//       const eachWord = current.message.split(" ");
//       accum = [
//         ...accum,
//         {
//           type: "custom-para",
//           attrs: {
//             s: current.name
//           },
//           content: eachWord.map((word: any, index: number) => ({
//             type: "text",
//             marks: [
//               {
//                 type: "meta-val",
//                 attrs: {
//                   meta: `example-${index + 1}`
//                 }
//               }
//             ],
//             text: ` ${word}`
//           }))
//         }
//       ];
//       return accum;
//     },
//     []
//   );

//   return userCardContentObj;
// };
