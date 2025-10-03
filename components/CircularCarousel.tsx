'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ACCENT_COLOR } from './theme';

// プロジェクトデータの型定義
interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  url: string;
  githubUrl?: string;
}

const projects: Project[] = [
  // ここにプロジェクトデータを追加してください
  {
    id: 1,
    image: "/images/project1.webp", // プロジェクト画像のパス
    title: "プロジェクト 1",
    description: "これはプロジェクト 1 の説明です。",
    url: "https://example.com/project1",
    githubUrl: "https://github.com/your/project1",
  },
  {
    id: 2,
    image: "/images/project2.webp",
    title: "プロジェクト 2",
    description: "これはプロジェクト 2 の説明です。",
    url: "https://example.com/project2",
    githubUrl: "https://github.com/your/project2",
  },
  {
    id: 3,
    image: "/images/project3.webp",
    title: "プロジェクト 3",
    description: "これはプロジェクト 3 の説明です。",
    url: "https://example.com/project3",
    githubUrl: "https://github.com/your/project3",
  },
  // 必要に応じてさらにプロジェクトを追加
];

export default function CarouselSection() { // コンポーネント名を変更
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.5);
  const [isVisible, setIsVisible] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const protectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // カルーセルを特定のインデックスにスクロールする関数
  const scrollToImage = useCallback((index: number) => {
    if (carouselRef.current) {
      // カルーセル内の子要素（画像コンテナ）の幅を取得
      // children[0] が undefined の場合を考慮してデフォルト値 0 を設定
      const imageWidth = carouselRef.current.children[0]?.clientWidth || 0;
      carouselRef.current.scrollTo({
        left: index * imageWidth,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  }, []);

  // 次の画像へ
  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  }, [projects.length]);

  // 前の画像へ
  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Intersection Observer でセクションの表示状態を監視
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // セクションが表示されたら、アニメーションで表示
          setIsVisible(true);
          setOpacity(1);
          setScale(1);
          
          // 5秒間保護状態にする
          setIsProtected(true);
          if (protectionTimeoutRef.current) {
            clearTimeout(protectionTimeoutRef.current);
          }
          protectionTimeoutRef.current = setTimeout(() => {
            setIsProtected(false);
          }, 5000);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (protectionTimeoutRef.current) {
        clearTimeout(protectionTimeoutRef.current);
      }
    };
  }, []);

  // スクロール検知でフェードアウト効果
  useEffect(() => {
    const handleScroll = () => {
      if (isProtected || !sectionRef.current || !isVisible) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // セクションの上端が画面上端に近づくほどフェードアウト
      if (rect.top <= windowHeight * 0.1) {
        const fadeStart = windowHeight * 0.1;
        const fadeDistance = windowHeight * 0.3;
        const scrolled = Math.max(0, fadeStart - rect.top);
        const newOpacity = Math.max(0, 1 - (scrolled / fadeDistance));
        const newScale = Math.max(0.5, 1 - (scrolled / fadeDistance) * 0.5);
        setOpacity(newOpacity);
        setScale(newScale);
      } else if (isVisible) {
        setOpacity(1);
        setScale(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初回実行

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isProtected, isVisible]);

  // 自動再生の開始/停止
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(nextImage, 3000); // 3秒ごとに画像を変更
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    // コンポーネントがアンマウントされるときにインターバルをクリア
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, nextImage]);

  // currentIndex の変更に応じてカルーセルをスクロール
  useEffect(() => {
    scrollToImage(currentIndex);
  }, [currentIndex, scrollToImage]);

  // 画像クリック時の処理
  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    // 画像をクリックしたら、自動再生がオンの場合は一時停止
    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  const globalScale = 0.9
  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="my-16 md:my-24 bg-white bg-opacity-80 rounded-lg shadow-xl p-8 transform transition-transform duration-500 hover:scale-105 pointer-events-auto"
      style={{ 
        opacity, 
        transform: `scale(${(scale * globalScale).toFixed(3)})`,
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' 
      }}
    >
      <h2 className="text-4xl md:text-5xl font-kaushan-script text-center mb-8 text-[#4d6f4d]">
        制作実績
      </h2>
      <div className="relative z-10 pointer-events-auto"> {/* z-10 を追加 */}
        {/* カルーセルコンテナ */}
        <div
          ref={carouselRef}
          className="flex overflow-x-hidden snap-x snap-mandatory scrollbar-hide space-x-4 p-4 pointer-events-auto"
        >
          {/* 各プロジェクトの画像と詳細 */}
          {projects.map((project, index) => (
            <div
              key={project.id}
              // 現在の画像と選択された画像のスタイルを調整
              className={`flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 snap-center transform transition-transform duration-300 ease-in-out
                ${index === currentIndex ? 'scale-105 opacity-100' : 'scale-90 opacity-70'} cursor-pointer pointer-events-auto`}
              onClick={(e) => { e.stopPropagation(); handleImageClick(index); }} // 画像クリックハンドラーを追加
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                  {/* 標準の<img>タグを使用 */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                    loading="lazy"
                    // 画像ロードエラー時のフォールバック画像
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/400x300/CCCCCC/333333?text=Image+Error`;
                    }}
                  />
                </div>
                {/* プロジェクトの詳細 */}
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-[#6a4e2e]">{project.title}</h3>
                  <p className="text-sm flex-grow mb-4" style={{ color: '#6a4e2e' }}>{project.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    {/* 詳細を見るリンク */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium pointer-events-auto z-30 relative hover:underline"
                      style={{ color: ACCENT_COLOR }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      詳細を見る
                    </a>
                    {/* GitHubリンク（存在する場合） */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200 pointer-events-auto z-30 relative"
                        style={{ color: ACCENT_COLOR }}
                        aria-label="GitHub Repository"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 両端矢印は下部ドットの左右に移動（ここでは削除） */}

        {/* 自動再生/一時停止ボタン */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full z-30 hover:bg-opacity-75 transition-opacity duration-300 focus:outline-none pointer-events-auto"
          aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
            </svg>
          )}
        </button>
      </div>
      {/* 下部コントロール：左矢印・ドット・右矢印 */}
      <div className="flex items-center justify-center gap-4 mt-6 pointer-events-auto">
        <button
          onClick={(e) => { e.stopPropagation(); prevImage(); }}
          className="p-2 focus:outline-none"
          style={{ color: ACCENT_COLOR }}
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" fill="currentColor" stroke="currentColor"></path>
          </svg>
        </button>

        <div className="flex items-center justify-center space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); handleImageClick(index); }}
              className="w-3 h-3 rounded-full transition-all duration-300 ease-in-out hover:scale-110"
              style={{ background: index === currentIndex ? ACCENT_COLOR : 'rgba(77, 111, 77, 0.3)' }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); nextImage(); }}
          className="p-2 focus:outline-none"
          style={{ color: ACCENT_COLOR }}
          aria-label="Next image"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" fill="currentColor" stroke="currentColor"></path>
          </svg>
        </button>
      </div>
    </section>
  );
}
