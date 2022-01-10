import {createSafeHtmlWithoutSanitize} from '../client';

import type {SafeHtml} from '../../../types/internal';

/**
 * Render tag <link rel="icon"> with favicon in data-uri format.
 * @internal
 */
export const renderFavicon = (): SafeHtml => createSafeHtmlWithoutSanitize`
<link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOoSURBVHgBtVfNTxNBFH9v2tIFI9bEBPEjKV70YGI96MGL9WaMIpw8Cge94kHPtPFqAvwFQOLdLRL1YEL9C6gHD5zYqAnChYJatrY7zzezLLTL7naB8ksm3c7X+5zfm0GIiUx+NWOfNkZAiLtIlJOAWQTKqDECrAogixArIOUX47dtVstD1Tj7YqcJxv21LKZwQiKOeQJjAXEO6rJofxq0IqeFDSiLd/pPTSLIF3AsYMFeGCiGjgZ1KquhB5f4MwvdgQX/6F6QN4S/I/VgI9dl4aD34j1TD37m/ANtHjgBy/044Il2D0QJJyhL6YyCoCFD7JwFSfe4cx4OB22gyi+vI+l9GMPrk7xhNngdFe33gwXvn+3+lFVLjWxMC0lLcU8ISlmClpk6BLuuXw1egXN2aWA8bEOXH/qmAGkMomGx18btxcFya6cbgpSYDFvlYGMmbMx4uJa3+3uXOwlnq2c4bDf9wvUYjKxmDNm7GbRQMVx9YeBs0Fh6eGMqBkcEWt2KpOEwvYbQEcf1AJ1qZuzBdwQyBxFQVqeT9UJ1IZqSOQnFXWVrENgDbYnFVk8QUAGiE05bvbN4obwDnZEkpFwYH6vMVnGGJm+awlkAmY/aLIbV+d1mcZvTa9LD65tRR4iVq7RWviCoXEnI5nht8aLpH9MnTCmPkG+uvAHVdlHhdjPZ6fxycNhDFD6OaPZibTzUaiaexvJEFs9ch+TVl+CsfQTa/qZGVA7lBRwR+g7AzFgvDYxWzWDhOnzMftTYBqr9APWbuv4aMNnvTckKtREcEtpqURsKcnkb0KX1ntuzkLzyDKCxBeLcHUhce+XNKPMpIAtcd3QWrJQlKjI3TNdjzE84TqVJNYDad1AhqH++BYkrz7Uy9Gdl1LHeWoLj+xViQuULL3hqPFob08nVAX8/XKpQY6uohGuFLj8B7LusTwsL195DtRnz/SwcBaQKElfEBpSjrl5KBgnxWAvkYsSFbQ72jGIqTsu+1UPd946hjB+ag9LDv6b5YwK6BCIw2aBSnNuxW45HOJ4ypBwfF1zOhdMshZ2YPRbuthf8UCcIEUy/MvtlwC3Ly3By90EPlr1wfsj7s8+Eis2EuufpQnFiwndlwEEFGLY5aDlCjMLJKKH3VjJaO4MfJm5Sdvdhwpb7hSsEFiM10Y0ThT6p4mLvPmgGc0Pnx6n2BhR46lOICfe17MyTwOkwwbEV8JDhU2K798c8C7jBS9ue56qoofc8TzABmfGe5/8BRCSvtlyDCPcAAAAASUVORK5CYII=" />`;
