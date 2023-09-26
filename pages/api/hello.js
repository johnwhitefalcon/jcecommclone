
export default async function handler(req, res) {
  const response = await fetch('https://7f614f.myshopify.com/admin/api/2022-10/products.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '8ae5408716f6ea8fdddd0094e082af12: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'
    },
  });

  const datax = await response.json();


}
