import React from 'react'
import Checkbox from '../../../../../../utilities/minitiatures/Checkbox/Checkbox';
import { Link } from 'react-router-dom';

const Offer3 = React.memo(() => {
    return <div className='subscription-item'>
        <div>
            <div className='subscription-name'>Premium</div>
            <div className='subscription-price'>150.000 Ariary</div>
        </div>
        <div className="subscription-pack-items">
            <div className='subscription-pack-item'>
                <Checkbox
                    label="3 mois d'accès"
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
                    label="Offre promotionnels sur les produits associés"
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
            to='/subscriptionpayment/premium'
            className='btn btn-outline-dark btn-sm'>
            <i className="fa-regular fa-crown"></i> Je m'abonne
        </Link>
    </div>
});

export default Offer3