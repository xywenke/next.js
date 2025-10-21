import Image from 'next/image'
import Link from 'next/link'

function Home() {
    return (
        <main>
            <dl>
                <dt>VOICE HANDLE</dt>
                <dd>
                    <Link
                        href='wav-align'
                    >
                        .wav file align
                    </Link>
                </dd>
                <dt>TEST</dt>
                <dd>
                    <Link
                        href='test'
                    >
                        layout
                    </Link>
                </dd>
            </dl>
        </main>
    )
}

export default Home