import React from 'react'
import Checkbox from '../../../../../../utilities/minitiatures/Checkbox/Checkbox';
import { Link } from 'react-router-dom';

const Offer2 = React.memo(() => {
    return <div className='subscription-item'>
        <div>
            <div className='subscription-name'>Trimium</div>
            <div className='subscription-price'>200.000 Ariary</div>
        </div>
        <div className="subscription-pack-items">
            <div className='subscription-pack-item'>
                <Checkbox
                    label="12 mois d'accès"
                    defaultChecked={true}
                    disabled={true}></Checkbox>
            </div>
            <div className='subscription-pack-item'>
                <Checkbox
                    label="Accès illimités aux comptes professionnels"
                    defaultChecked={true}
                    disabled={true}></Checkbox>
            </div>
            <div className='subscription-pack-item'>
                <Checkbox
                    label="Priorité sur les rendez-vous"
                    defaultChecked={true}
                    disabled={true}></Checkbox>
            </div>
            <div className='subscription-pack-item'>
                <Checkbox
                    label="Accompagnement, suivi et conseils"
                    defaultChecked={true}
                    disabled={true}></Checkbox>
            </div>
            <div className='subscription-pack-item'>
                <Checkbox
                    label="Offre promotionnels sur les produits associés"
                    defaultChecked={true}
                    disabled={true}></Checkbox>
            </div>
            <div className='subscription-pack-item'>
                <Checkbox
                    label="4 heures par mois d'échanges / d'appels."
                    defaultChecked={true}
                    disabled={true}></Checkbox>
            </div>
            <div className='subscription-pack-item'>
                <Checkbox
                    label="Menu par mois"
                    defaultChecked={true}
                    disabled={true}></Checkbox>
            </div>
        </div>
        <Link
            to='/subscriptionpayment/trimium'
            type='button'
            className='btn btn-outline-dark'><i className="fa-solid fa-crown"></i> Je m'abonne
        </Link>
    </div>
});

export default Offer2