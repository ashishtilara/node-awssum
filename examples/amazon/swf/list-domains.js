var fmt = require('fmt');
var awssum = require('awssum');
var amazon = awssum.load('amazon/amazon');
var Swf = awssum.load('amazon/swf').Swf;

var env             = process.env;
var accessKeyId     = env.ACCESS_KEY_ID;
var secretAccessKey = env.SECRET_ACCESS_KEY;
var awsAccountId    = env.AWS_ACCOUNT_ID;

var swf = new Swf({
    'accessKeyId' : accessKeyId,
    'secretAccessKey' : secretAccessKey,
    'region' : amazon.US_EAST_1
});

fmt.field('Region', swf.region() );
fmt.field('EndPoint', swf.host() );
fmt.field('AccessKeyId', swf.accessKeyId() );
fmt.field('SecretAccessKey', swf.secretAccessKey().substr(0, 3) + '...' );
fmt.field('AwsAccountId', swf.awsAccountId() );

swf.ListDomains({ 'RegistrationStatus' : 'REGISTERED' }, function(err, data) {
    fmt.msg("listing all REGISTERED domains - expecting success");
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');
});
