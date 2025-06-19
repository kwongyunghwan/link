export function successResponse(data, status){
    const responsoBody = { success:true, data: data};
    // 응답 본문에 'success: true'와 실제 데이터를 포함
    return new Response(JSON.stringify(responsoBody),{
        status: status,
        headers:{
            'Content-Type': 'application/json',
        },
    });
}

export function errorResponse(message, status){
    // 응답 본문에 'success: false'와 에러 메시지를 포함
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