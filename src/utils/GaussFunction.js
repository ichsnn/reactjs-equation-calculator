function countGauss(matriks, callback) {
    const m = [...matriks];
    for (let i = 0; i < m.length; i++) {
        if (m[i][i] !== 1) {
            let divider;
            for (let j = 0; j < m[i].length; j++) {
                if (!divider) {
                    divider = m[i][i];
                }
                m[i][j] = m[i][j] / divider;
            }
        }

        for (let b = 0; b < m.length; b++) {
            if (i === b || b < i) {
            } else {
                let constant;
                for (let k = 0; k < m[b].length; k++) {
                    if (!constant) {
                        constant = m[b][k];
                    }
                    m[b][k] = m[b][k] - constant * m[i][k];
                }
            }
        }
    }
    return m;
}

function countGaussJordan(matriks, callback) {
    const m = [...matriks];
    for (let i = 0; i < m.length; i++) {
        for (let b = 0; b < m.length; b++) {
            if (i !== b && b < i) {
                let constant;
                for (let k = 0; k < m[b].length; k++) {
                    if (!constant) {
                        constant = m[b][i];
                    }
                    m[b][k] = m[b][k] - constant * m[i][k];
                }
            }
        }
    }
    return m;
}

export {countGauss, countGaussJordan}