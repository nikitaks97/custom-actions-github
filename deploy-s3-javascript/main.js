const core= require('@actions/core');
const github= require('@actions/github');
const exec= require('@actions/exec');

function run() {
    // get input values
 const bucket =  core.getInput('bucket' , { required:true });       //retrive the imputs from action.yml file and store it in a constant
 const bucketRegion =  core.getInput('bucketRegion' , { required:true });
 const distFolder = core.getInput('dist-folder', { required:true });
    core.notice('Hello from custom js action!')
  // upload files
 const s3Uri = `s3://${bucket}`;
 exec.exec(`aws s3 sync ${distFolder}  ${s3Uri}  --region ${bucketRegion}`);

 const websiteURL = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
 core.setOutput('website-URL ',websiteURL); // set output
}
 run();
