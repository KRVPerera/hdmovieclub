import React from 'react'
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types'

const MetaDecorator = ({title, description, type, imagelink}) => (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content={type} />
        <meta property="og:image" content={imagelink} />
    </Helmet>
)

MetaDecorator.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    imagelink: PropTypes.string
}

export default MetaDecorator;