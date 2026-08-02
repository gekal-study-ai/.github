"use client";

import * as React from "react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";

/**
 * MUI のリンク系コンポーネントに next/link を組み込むためのアダプタ。
 *
 * Server Component から `component={NextLink}` を直接渡すと、関数を
 * Client Component に渡すことになりビルドが落ちる。テーマの defaultProps
 * 経由でこのコンポーネントを差し込むことで、各ページでは href を渡すだけで
 * next/link によるクライアント遷移が効くようにする。
 */
const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<NextLinkProps, "href"> & { href?: NextLinkProps["href"] }
>(function LinkBehavior({ href = "", ...other }, ref) {
  return <NextLink ref={ref} href={href} {...other} />;
});

export default LinkBehavior;
