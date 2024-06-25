import Head from "next/head";
import GNB from "./GNB";

interface Props {
    title: string;
    children: React.ReactNode;
}

export const ServiceLayout = ({title= 'blah blah', children}: Props) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            <GNB />
            {children}
        </div>
    )
};