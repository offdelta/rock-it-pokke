'use client'

import { useState, useEffect, useRef } from 'react';

interface GifPlayerProps {
  gifSrc: string;
  staticSrc: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
}

const GifPlayer = ({ gifSrc, staticSrc, alt, className, style, onLoad }: GifPlayerProps) => {
  // GIFを表示するかどうかを管理する状態
  // true: GIFを表示, false: 静止画を表示
  const [showGif, setShowGif] = useState(true);

  // setTimeoutのIDを保持するためのRef
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 既に静止画に切り替わっている場合は何もしない
    // (コンポーネントが再レンダリングされた際に、すでに停止済みならタイマーを再設定しないため)
    if (!showGif) {
      return;
    }

    // GIFを7.4秒後に静止画に切り替えるタイマーを設定（一度だけ実行）
    timerRef.current = setTimeout(() => {
      // 7.4秒経過後、showGifをfalseに設定し、静止画が表示されるようにする
      setShowGif(false);
    }, 7400); // 7.4秒 (ミリ秒単位で指定)

    // クリーンアップ関数
    // コンポーネントがアンマウントされる時や、依存配列が変更されてuseEffectが再実行される前に、
    // 未完了のタイマーがあればクリアします。これにより、メモリリークを防ぎます。
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [showGif]); // showGifの状態が変化したときにこのuseEffectを再実行

  return (
    <div className="relative w-full h-full">
      {/* showGifがtrueの場合、GIF画像を表示 */}
      {showGif && (
        <img
          src={gifSrc}
          alt={alt}
          className={className}
          style={style}
          onLoad={onLoad}
        />
      )}

      {/* showGifがfalseの場合、静止画（最後のコマ）を表示 */}
      {!showGif && (
        <img
          src={staticSrc}
          alt={`${alt} (静止画)`}
          className={className}
          style={style}
        />
      )}
    </div>
  );
};

export default GifPlayer;