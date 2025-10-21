'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import styles from './main.module.css'

const PATH_NAMES = {
    '/': 'Home',
    'wav-align': 'WavAlign',
    '/test': 'Test',
}

function Breadcrumb () {
    const pathname = usePathname()
    const [breadcrumbs, setBreadcrumbs] = useState([])

    useEffect(() => {
        if (!pathname) return

        // 移除开头和结尾的斜杠，并分割
        const pathSegments = pathname.split('/').filter((seg) => seg !== '')

        const crumbs = pathSegments.map((seg, index) => {
            // 构建到当前层级的路径
            const href = '/' + pathSegments.slice(0, index + 1).join('/')

            // 查找别名，找不到则使用原始路径（可进一步美化）
            const label = PATH_NAMES[href] || decodeURIComponent(seg)

            return { href, label }
        })

        // 如果不是以 / 开头，添加首页
        if (pathname !== '/' && crumbs.length > 0) 
            crumbs.unshift({ href: '/', label: '首页' })

        setBreadcrumbs(crumbs)
    }, [pathname])

    if (breadcrumbs.length === 0) return null

    return (
        <nav>
            <ol className="flex space-x-1 list-none">
            { breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1
                return (
                    <li key={crumb.href} className="flex items-center">
                        { isLast ? (
                            <span className="text-gray-500 font-medium">{crumb.label}</span>
                        ) : (
                            <Link href={crumb.href} className="text-blue-600 hover:underline">
                                {crumb.label}
                            </Link>
                        )}
                        {!isLast && <span className="mx-2 text-gray-400">/</span>}
                    </li>
                )
            })}
            </ol>
        </nav>
    )
}

export default Breadcrumb