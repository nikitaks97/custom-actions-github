// Import the 'core' module from '@actions/core' to access input/output functions and logging
const core = require('@actions/core');

// Import the 'github' module from '@actions/github' (not used in this script but can be helpful for GitHub context)
const github = require('@actions/github');

// Import the 'exec' module from '@actions/exec' to run shell commands
const exec = require('@actions/exec');

function run() {
    // Retrieve the 'bucket' input defined in the action.yml file; required means it must be provided
    const bucket = core.getInput('bucket', { required: true });

    // Retrieve the 'bucketRegion' input (e.g., 'us-east-1'), also required
    const bucketRegion = core.getInput('bucketRegion', { required: true });

    // Retrieve the 'dist-folder' input which is the folder to be uploaded to the S3 bucket
    const distFolder = core.getInput('dist-folder', { required: true });

    // Log a notice message to the Actions console
    core.notice('Hello from custom js action!');

    // Construct the S3 URI where files will be uploaded
    const s3Uri = `s3://${bucket}`;

    // Use AWS CLI to sync the contents of the 'dist-folder' to the specified S3 bucket in the given region
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    // Construct the URL of the static website hosted on S3
    const websiteURL = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;

    // Set the constructed website URL as an output variable named 'website-URL '
    core.setOutput('website-URL ', websiteURL); // Note: the space in the output name might cause issues
}

// Call the run function to execute the script
run();
