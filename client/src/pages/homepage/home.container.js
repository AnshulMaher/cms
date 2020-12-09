import HomePage from './home.page';
import { getClients } from '../../utils/apiCall';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsSuccess } from '../../redux/choices/choices.actions';
import Spinner from '../../components/spinner/spinner.component';
import IsAuthenticated from '../../components/is-authenticated-hoc/is-authenticated-hoc.component';

const HomePageContainer = ({ history }) => {
    const clients = useSelector((state) => state.choices.clients);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchClients = async () => {
            const res = await getClients();
            if (res.error) return;
            else if (res.data.status === 'success') dispatch(fetchClientsSuccess(res.data.data));
        };
        fetchClients();
    }, []);

    return clients.length ? <HomePage history={history} /> : <Spinner />;
};

export default IsAuthenticated(HomePageContainer);
