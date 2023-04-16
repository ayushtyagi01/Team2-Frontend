export const getBookingData = (data:any)=>{
    const bookingData = {
        "roomType":localStorage.getItem('roomTypeName'),
        "guests": "Adult "+JSON.parse(localStorage.getItem('guest')!)[0]+",Child "+JSON.parse(localStorage.getItem('guest')!)[1],
        "checkInDate":localStorage.getItem('startDate'),
        "checkOutDate":localStorage.getItem('endDate'),
        "promoTitle": localStorage.getItem('promotionTitle'),
        "promoDescription": "Get special discount on "+localStorage.getItem('roomTypeName'),
        "nightlyRates": localStorage.getItem('averageNightlyRateInDuration'),
        "priceFactor":localStorage.getItem('priceFactor'),
        "guestInfoDto": {
            "firstName": data.FirstName,
            "lastName": data.LastName,
            "phone": data.Phone,
            "emailID": data.Email,
            "sendPromoMail": data.isChecked
        },
        "billingInfoDto": {
            "firstName": data.FirstName,
            "lastName": data.LastName,
            "mailingAddress1": data.MailingAddress1,
            "mailingAddress2": data.MailingAddress2,
            "country": data.Country,
            "city": data.City,
            "state": data.State,
            "zip": data.Zip,
            "phone": data.Phone,
            "emailID": data.Email
        },
        "paymentInfoDto":{
            "cardName":data.CardName,
            "expiryMonth":data.ExpMM,
            "expiryYear":data.ExpYY
        }
    }
    return bookingData;
}