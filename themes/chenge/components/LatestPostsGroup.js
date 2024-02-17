import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'
import { useGlobal } from '@/lib/global'
// import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { checkContainHttp, sliceUrlFromHttp } from '@/lib/utils'

/**
 * 最新文章列表
 * @param posts 所有文章数据
 * @param sliceCount 截取展示的数量 默认6
 * @constructor
 */
const LatestPostsGroup = ({ latestPosts, siteInfo }) => {
  // 获取当前路径
  const currentPath = useRouter().asPath
  const { locale } = useGlobal()

  if (!latestPosts) {
    return <></>
  }

  return <>
        <div className=" mb-2 mt-2 px-1 flex flex-nowrap justify-between">
            <div>
                <i className="mr-2 fas fas fa-history" />
                {locale.COMMON.LATEST_POSTS}
            </div>
        </div>
        {latestPosts.map(post => {
          const headerImage = post?.pageCoverThumbnail ? post.pageCoverThumbnail : siteInfo?.pageCover
          const url = checkContainHttp(post.slug) ? sliceUrlFromHttp(post.slug) : `${siteConfig('SUB_PATH', '')}/${post.slug}`
          const selected = currentPath === url

          return (
            (<Link
                    key={post.id}
                    title={post.title}
                    href={url}
                    passHref
                    className={'my-3 flex'}>

                    <div className="w-20 h-14 overflow-hidden relative">
                        <LazyImage src={`${headerImage}`} className='object-cover w-full h-full'/>
                    </div>
                    <div
                        className={
                            (selected ? ' text-indigo-400 ' : 'dark:text-gray-400 ') +
                            ' text-sm overflow-x-hidden px-2 duration-200 w-full rounded ' +
                            'cursor-pointer items-center flex'
                        }
                    >
                        <div>
                            <div className='line-clamp-2 menu-link'>{post.title}</div>
                            <div className="text-gray-500">{post.lastEditedDay}</div>
                        </div>
                    </div>

                </Link>)
          )
        })}
    </>
}
export default LatestPostsGroup
