function sliceHTML(html: string, length: number): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const divWrapper: HTMLDivElement = doc.createElement("div");

  const childNodesArray = Array.from(doc.body.childNodes);
  divWrapper.append(...childNodesArray);

  doc.body.innerHTML = "";

  let currentLength: number = 0;
  let result: string = "";

  function traverseNodes(node: Node): void {
    if (currentLength >= length) return;

    if (node.nodeType === Node.TEXT_NODE) {
      const text: string = node.textContent || "";
      if (currentLength + text.length > length) {
        result += text.slice(0, length - currentLength);
        currentLength = length;
      } else {
        result += text;
        currentLength += text.length;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      result += `<${element.nodeName.toLowerCase()}`;
      if (element.attributes) {
        Array.from(element.attributes).forEach((attr) => {
          result += ` ${attr.name}="${attr.value}"`;
        });
      }

      result += ">";
      Array.from(element.childNodes).forEach((child) => {
        traverseNodes(child);
      });
      result += `</${element.nodeName.toLowerCase()}>`;
    }
  }

  traverseNodes(divWrapper);

  return result;
}

export default sliceHTML;
