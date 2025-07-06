export function flattenGeminiMermaid(mermaidCode) {



  let clear = mermaidCode.replace(/^'/, '')                  // remove starting quote
  .replace(/'$/, '')                  // remove ending quote
  .replace(/\\n/g, '\n');
  // Optional: encode to base64 for Mermaid.ink preview
  const encoded = Buffer.from(clear).toString('base64');
  const imageURL = `https://mermaid.ink/img/${encoded}`;

  console.log(imageURL);

  return imageURL; // or `imageURL` if you want image
}
