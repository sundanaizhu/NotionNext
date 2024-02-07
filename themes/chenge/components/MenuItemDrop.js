import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router';

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0
  const router = useRouter();

  // 判断当前项或其子菜单项是否激活
  const isActive = hasSubMenu ? 
    link.subMenus.some(subLink => router.asPath === subLink.to) : 
    router.asPath === link.to;

  if (!link || !link.show) {
    return null
  }

  return <div onMouseOver={() => changeShow(true)} onMouseOut={() => changeShow(false)} >

        {!hasSubMenu &&
            <Link
                href={link?.to} target={link?.to?.indexOf('http') === 0 ? '_blank' : '_self'}
                className={`${isActive ? 'text-hexo-aqua dark:text-hexo-dark-aqua border-b-2 border-hexo-aqua dark:border-hexo-dark-aqua': 'menu-link'} font-sans px-1 mx-3 tracking-widest pb-1`}>
                {link?.icon && <i className={link?.icon}/>} {link?.name}
                {hasSubMenu && <i className='px-2 fa fa-angle-down'></i>}
            </Link>}

        {hasSubMenu && <>
            <div className={`${isActive ? 'text-hexo-aqua dark:text-hexo-dark-aqua': ''} cursor-pointer font-sans pl-1 mx-3 tracking-widest`}>
                {link?.icon && <i className={link?.icon}/>} {link?.name}
                <i className={`pl-1 inline-block iconfont icon-xiala duration-300 ${show ? 'rotate-180' : 'rotate-360'}`}></i>
            </div>
        </>}

        {/* 子菜单 */}
        {hasSubMenu && <ul style={{ backdropFilter: 'blur(3px)' }} className={`${show ? 'visible opacity-100 top-12' : 'invisible opacity-0 top-20'} drop-shadow-md overflow-hidden rounded-tr-lg rounded-bl-lg text-black dark:text-white bg-white dark:bg-black transition-all duration-300 z-20 absolute block  `}>
            {link.subMenus.map((sLink, index) => {
              return <li key={index} className='cursor-pointer hover:bg-indigo-300 hover:text-black tracking-widest transition-all duration-200 dark:border-gray-800  py-1 pr-6 pl-3'>
                    <Link href={sLink.to} target={link?.to?.indexOf('http') === 0 ? '_blank' : '_self'}>
                        <span className='text-sm text-nowrap font-extralight'>{link?.icon && <i className={sLink?.icon} > &nbsp; </i>}{sLink.title}</span>
                    </Link>
                </li>
            })}
        </ul>}

    </div>
}
