import styles from './main.module.css'

function VerticalGridLine ({span=40, width=1}) {
    return (
        <div
            style={{
                backgroundImage: `repeating-linear-gradient(
                    to right,
                    transparent,
                    transparent ${span-width}px,
                    #e5e5e5 ${span-width}px,   /* start at 39px */
                    #e5e5e5 ${span}px    /* line is 1px wide (39-40px) */
                )`
            }}
            className={styles.verticalLine}
        />
    )
}

VerticalGridLine.propTypes = {
    span: function (props, propName, componentName) {
        const v = props[propName]
        if (typeof v != 'number')
            return new Error(`${propName} must be a number in ${componentName}`)
        if (v < 0)
            return new Error(`${propName} must be >= 0, Received: ${v}`)
    }
}

export default VerticalGridLine