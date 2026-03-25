interface FetchConfigProps<T> {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    contentType?: string;
    params?: Record<string, any>;
    body?: T;
}

export default async function fetchConfig<T>({
    url,
    method,
    params,
    contentType = 'application/json',
    body,
}: FetchConfigProps<T>) {
    let finalUrl = url;

    if (method === 'GET' && params) {
        const queryString = new URLSearchParams(
            Object.entries(params).reduce((item, [key, value]) => {
                if (value !== undefined && value !== null) {
                    item[key] = String(value);
                }
                return item;
            }, {} as Record<string, string>)
        ).toString();

        finalUrl += `?${queryString}`;
    }

    const res = await fetch(url, {
        method,
        next: { revalidate: 60 },
        headers: {
            'Content-Type': contentType,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'API Error');
    }

    return res.json();
}
