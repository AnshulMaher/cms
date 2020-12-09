import UpdatePage from './update.page';
import { getClients } from '../../utils/apiCall';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsSuccess } from '../../redux/choices/choices.actions';
import Spinner from '../../components/spinner/spinner.component';
import WithCandidate from '../../components/with-candidate-hoc/with-candidate-hoc.component';
import IsAuthenticated from '../../components/is-authenticated-hoc/is-authenticated-hoc.component';

const UpdatePageContainer = ({ history }) => {
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

    return clients.length ? <UpdatePage history={history} /> : <Spinner />;
};

export default IsAuthenticated(WithCandidate(UpdatePageContainer));
