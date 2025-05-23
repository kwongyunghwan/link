export function successResponse(data, status){
    const responsoBody = { success:true, data: data};
    return new Response(JSON.stringify(responsoBody),{
        status: status,
        headers:{
            'Content-Type': 'application/json',
        },
    });
}

export function errorResponse(message, status){
    return new Response(JSON.stringify({
        success: false,
        error: message
    }),{
        status: status,
        headers:{
            'Content-Type' : 'application/json'
        }
    });
}