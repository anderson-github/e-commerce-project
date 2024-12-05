import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} | E-Commerce Platform`}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charSet="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        </Helmet>
    );
};

export default MetaData;
