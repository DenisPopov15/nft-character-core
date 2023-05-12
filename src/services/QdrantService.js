'use strict'

// SELFHOSTED Alternative Vector DB:
// https://qdrant.tech/
// https://qdrant.github.io/qdrant/redoc/index.html#tag/points/operation/upsert_points
// https://github.com/qdrant/qdrant-js

// Couple more options:
// https://weaviate.io/   https://weaviate.io/developers/weaviate/installation/docker-compose
// https://milvus.io/     https://milvus.io/docs/install_standalone-docker.md

class QdrantService {
  constructor(logger) {
    this._logger = logger || console
  }

}

module.exports = QdrantService
