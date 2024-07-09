const fs = require('fs/promises');

async function postProssess(){
    console.log("running post processing");
    const err = await fs.mkdir('./site_dist/.well-known/');
    if(err){
        console.log("error")
    }
    const stellarContent = `
# Federation service provided by StellarID.io
FEDERATION_SERVER="https://stellarid.io/federation/"
    `
    await fs.writeFile('./site_dist/.well-known/stellar.toml', stellarContent);
    netlifyContent = `
[[headers]]
# Define which paths this specific [[headers]] block will cover.
for = "/.well-known/*"
[headers.values]
Access-Control-Allow-Origin = "*"
    `;
    await fs.writeFile('./site_dist/netlify.toml', netlifyContent);
    await fs.cp('./docs', './site_dist/docs', { recursive: true }, (err) => {
        if (err) {
          console.error(err);
        }
    });
    await fs.cp('./faq', './site_dist/docs', { recursive: true }, (err) => {
        if (err) {
          console.error(err);
        }
    });
    console.log("post processing complete");
}

postProssess()