import styles from './main.module.css'

function CursorVerticalLine({ x=0 }) {
    return (
        <div 
            style={{
                'left': `${x}px`
            }}
            className={styles.verticalLine}
        />
    )
}

CursorVerticalLine.propTypes = {
    x: function (props, propName, componentName) {
        const v = props[propName]

        if (typeof v !== 'number')
            return new Error(`${propName} must be a number in ${componentName}`)
        if (v < 0)
            return new Error(`${propName} must be >= 0, Received: ${v}`)
    }
}

export default CursorVerticalLine