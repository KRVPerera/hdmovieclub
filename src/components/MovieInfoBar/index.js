import PropTypes from 'prop-types'

// Helpers
import {calcTime, convertMoney} from "../../helpers";

// Styles
import {Wrapper, Content} from "./MovieInforBar.styles"

const MovieInfoBar = ({time, budget, revenue}) => (
<Wrapper>
    <Content>
        <div className="column">
            <p>Running time : {calcTime(time)}</p>
        </div>
        {budget && <div className="column">
            <p>Budget : {convertMoney(budget)}</p>
        </div> }
        {revenue && <div className="column">
            <p>Revenue : {convertMoney(revenue)}</p>
        </div>}
    </Content>
</Wrapper>
)

MovieInfoBar.propTypes = {
    time: PropTypes.number,
    budget: PropTypes.number,
    revenue: PropTypes.number
}

export default MovieInfoBar