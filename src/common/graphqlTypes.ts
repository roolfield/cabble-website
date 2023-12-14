import { TypedDocumentNode } from '@graphql-typed-document-node/core';

export type UseTypedDocumentNodeType<D> = D extends TypedDocumentNode<
  infer T,
  any
>
  ? T
  : never;
