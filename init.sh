#!/bin/sh


# Configure MinIO client (mc)
mc alias set local http://minio-storage:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD

# Create the bucket if it does not exist
if [ -n "$R2_BUCKET_NAME" ]; then
  mc mb local/$R2_BUCKET_NAME --ignore-existing
  echo "Bucket '$R2_BUCKET_NAME' created successfully!"
else
  echo "Error: Bucket name not defined!"
fi

# Keep the container running
tail -f /dev/null
