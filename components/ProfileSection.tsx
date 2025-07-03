export default function ProfileSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* タイトル */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{color: '#243b53'}}>
            4人のママだから、わかること。
          </h2>
          <p className="text-lg md:text-xl" style={{color: '#486581'}}>
            あなたの想いをカタチにする、寄り添うウェブ制作。
          </p>
        </div>

        {/* ご挨拶 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
          <h3 className="text-2xl font-bold mb-6" style={{color: '#243b53'}}>ご挨拶</h3>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              はじめまして！<br />
              〇〇（屋号・会社名）代表の〇〇（お名前）です。
            </p>
            <p>
              都内で4人の子どもたちを育てるアラフォーママであり、企業のウェブサイトを制作する会社の代表をしています。
            </p>
            <p>
              プライベートでは、子どもたちの声が響く賑やかな家で、MacBookを開いて仕事をするのが私の日常。ベランダの小さな家庭菜園で植物の成長に癒されたり、週末は家族みんなでお寿司や鰻を囲んで「おいしいね」と言い合ったり。そんな何気ない暮らしのひとときを大切にしています。
            </p>
          </div>
        </div>

        {/* この仕事への想い */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8" style={{backgroundColor: 'rgba(250, 248, 245, 0.9)'}}>
          <h3 className="text-2xl font-bold mb-6" style={{color: '#243b53'}}>この仕事への想い</h3>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              私がこの仕事を始めたのは、第一子の出産がきっかけでした。<br />
              子育てをしながら社会とつながりを持ちたい、自分のスキルで誰かの役に立ちたい。そう考え、個人事業主として歩み始めました。
            </p>
            <p>
              当時は、家事と育児と仕事の両立に奮闘する毎日。<br />
              「もっと効率よく情報発信できたら…」<br />
              「想いはたくさんあるのに、どう伝えたらいいか分からない…」<br />
              そんな自身の経験から、同じように頑張る女性、特にママたちの力になりたいと強く思うようになりました。
            </p>
            <p className="font-medium" style={{color: '#486581'}}>
              ウェブサイトは、単なる「事業の顔」ではありません。<br />
              忙しいあなたの代わりに、24時間365日、その想いやサービスの魅力を伝え続けてくれる、頼もしいパートナーです。
            </p>
            <p>
              おかげさまで多くの素敵なご縁に恵まれ、このたび法人化いたしました。<br />
              これからも、一人ひとりの心に寄り添い、「あなただけの価値」が伝わるウェブサイトを、心を込めて作っていきます。
            </p>
          </div>
        </div>

        {/* 私の強み・大切にしていること */}
        <div className="bg-white rounded-2xl shadow-sm p-8" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
          <h3 className="text-2xl font-bold mb-8" style={{color: '#243b53'}}>私の強み・大切にしていること</h3>
          
          <div className="space-y-8">
            {/* 強み① */}
            <div className="border-l-4 pl-6" style={{borderColor: '#4d6f4d'}}>
              <h4 className="text-xl font-bold mb-3" style={{color: '#3d5a3d'}}>
                強み①：ママ目線の「共感力」と「提案力」
              </h4>
              <p className="text-gray-700 leading-relaxed">
                4人の子育て経験から、ママ起業家や女性オーナーが抱える時間の制約や特有の悩みを深く理解しています。専門用語を並べるのではなく、「それ、すっごく分かります！」という共感からスタート。あなたの状況に合わせた最適なウェブサイトの形を、一緒に見つけます。
              </p>
            </div>

            {/* 強み② */}
            <div className="border-l-4 pl-6" style={{borderColor: '#b86438'}}>
              <h4 className="text-xl font-bold mb-3" style={{color: '#b86438'}}>
                強み②：暮らしに根差した「心地よいデザイン」
              </h4>
              <p className="text-gray-700 leading-relaxed">
                お家の模様替えで「どうすれば家族が快適に過ごせるかな？」と考えるように、ウェブサイトでも「どうすればお客様が心地よく、知りたい情報にたどり着けるか」を第一に考えます。洗練されていて、なおかつ温かみのある、あなたらしい空間（ウェブサイト）をデザインするのが得意です。
              </p>
            </div>

            {/* 強み③ */}
            <div className="border-l-4 pl-6" style={{borderColor: '#486581'}}>
              <h4 className="text-xl font-bold mb-3" style={{color: '#486581'}}>
                強み③：PCが苦手でも安心！「とことん丁寧なサポート」
              </h4>
              <p className="text-gray-700 leading-relaxed">
                「更新作業が難しそう…」そんな不安も、Macをこよなく愛する私にお任せください！直感的で分かりやすい操作方法のレクチャーや、納品後のサポートも充実しています。安心してあなたのビジネスに集中できるよう、全力でバックアップします。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}