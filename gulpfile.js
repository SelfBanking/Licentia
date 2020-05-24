require('dotenv').config()
const gulp = require('gulp')
const revall = require('gulp-rev-all')
const awspublish = require('gulp-awspublish')
const through = require('through2')
const Cloudfront = require('aws-sdk/clients/cloudfront')

const credentials = {
  key: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_BUCKET,
  region: process.env.AWS_REGION || 'ap-southeast-1',
  distributionId: process.env.AWS_DISTRO_ID
}

const headers = { 'Cache-Control': 'max-age=315360000, no-transform, public' }

// aws cloudfront update-distribution --id <id> --default-root-object <filename>
const cloudfront = new Cloudfront()

// need to update the index.html ( Default Root Object) include version tag
async function updateCloudfrontRootObject (file) {
  const params = { Id: process.env.AWS_DISTRO_ID }

  cloudfront.getDistributionConfig(params, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      const distConfig = data.DistributionConfig
      params.IfMatch = data.ETag
      distConfig.DefaultRootObject = file
      params.DistributionConfig = distConfig
      cloudfront.updateDistribution(params, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Cloudfront Default Root Object updated Successfully.')
        }
      })
    }
  })
}

async function publish () {
  console.log(credentials.bucket)
  const publisher = await awspublish.create(
    {
      region: credentials.region,
      params: {
        Bucket: credentials.bucket
      }
    },
    {
      cacheFileName: 'cloudfront-cache'
    }
  )

  return (
    gulp
      .src('build/**/**')
      .pipe(revall.revision())

      // go through files and updated the index.html file with a tag
      .pipe(
        through.obj(function (chunk, enc, cb) {
          const path = chunk.path
          const array = path.split('/')
          const re = /(?:index|html)/
          const flag = 0
          array.forEach(e => {
            if (re.test(path)) {
              if (array.length === 8 && re.test(e)) {
                updateCloudfrontRootObject(e)
              }
            }
          })
          cb(null, chunk)
        })
      )
      .pipe(awspublish.gzip())
      .pipe(publisher.publish(headers))
      .pipe(publisher.cache())
      .pipe(awspublish.reporter())
  )
}

const deploy = gulp.series(publish)

gulp.task('deploy', deploy, done => done())
