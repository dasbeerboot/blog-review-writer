import Link from 'next/link'

export function Footer() {
    return (
        <footer className="w-full py-4 px-6 border-t">
            <div className="container mx-auto flex justify-center items-center">
                <Link
                    href="/privacy"
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                    개인정보 처리방침
                </Link>
            </div>
        </footer>
    )
} 